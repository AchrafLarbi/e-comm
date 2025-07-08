from django.shortcuts import render
# rest_framework
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from ..serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from ..decorators import IsSuperUser

# customize simple jwt token response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    customize the token response to include more data
    """
    def validate(self, attrs):
        """ we are overriding the validate method to add more key value pairs to the response
        """
        data = super().validate(attrs)
        data={}
        # make empty dictionary
        refresh = self.get_token(self.user)
        serializer=UserSerializerWithToken(self.user).data
        data.update(serializer)
         
        return data
    
# login view
class MyTokenObtainPairView(TokenObtainPairView):
    """ 
    customize the token response to include more data
    """
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['POST']) 
def registerUser(request):
    data=request.data
    try:
        user=User.objects.create(
            first_name=data['name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
    except:
        if User.objects.filter(username=data['username']).exists() and User.objects.filter(email=data['email']).exists():
            message={'detail':'User with this email and username already exists'}
        elif User.objects.filter(email=data['email']).exists():
            message={'detail':'User with this email already exists'}
        else:
            message={'detail':'User with this username already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    user.save()
    serlized=UserSerializerWithToken(user,many=False)
    return Response(serlized.data)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getUserProfile(request):
    user=request.user
    serialized_users=UserSerializer(user,many=False)
    return Response(serialized_users.data)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    data=request.data
    user.first_name=data['name']
    user.username=data['username']
    user.email=data['email']
    if data['password'] != '':
        user.password=make_password(data['password'])
    user.save()
    serialized_users=UserSerializerWithToken(user,many=False)
    return Response(serialized_users.data,status=status.HTTP_200_OK)


# admin views to handle users
@api_view(['GET']) 
@permission_classes([IsAuthenticated,IsAdminUser]) 
def getUsers(request):
    users=User.objects.all()
    users=UserSerializer(users,many=True)
    return Response(users.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated,IsAdminUser])
def deleteUser(request,pk):
    user=User.objects.filter(id=pk)
    if user.exists():
        user=user.first()
        if user == request.user:
             return Response({'detail':'You cannot delete yourself'},status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({'detail':'User deleted'},status=status.HTTP_200_OK)

    return Response({'detail':'User does not exist'},status=status.HTTP_400_BAD_REQUEST)
     

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def getUserById(request,pk):
    user=User.objects.filter(id=pk)
    if user.exists():
        user=UserSerializer(user.first(),many=False)
        return Response(user.data,status=status.HTTP_200_OK)
    return Response({'detail':'User does not exist'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated,IsSuperUser])
def updateUser(request,pk):
    user=User.objects.filter(id=pk)
    if not user.exists():
        return Response({'detail':'User does not exist'},status=status.HTTP_400_BAD_REQUEST)
    user=user.first()
    data=request.data
    user.is_staff=data['isAdmin']
    user.save()
    serialized_users=UserSerializer(user,many=False)
    return Response(serialized_users.data,status=status.HTTP_200_OK)

    


    
