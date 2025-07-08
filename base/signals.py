from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
@receiver(pre_save,sender=User)
def updateUser(sender,instance,**kwargs):
    """
    this function will be triggered when the user model is updated
    
    """
    # this will update the username to be the email
    if instance.email != '':
        instance.username=instance.email
    pass
    
