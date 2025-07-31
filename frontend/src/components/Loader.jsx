import Spinner from 'react-bootstrap/Spinner';

function Loader({size=100}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px'}}>
            <Spinner animation="border" variant="primary" role='status'
            className='d-block m-auto spinner-border'
            style={{height:`${size}px`,
                width:`${size}px`,
                color: 'var(--syra-burgundy)'
            }}
            >
               
            </Spinner>
            <span className='sr-only' style={{color: 'var(--syra-burgundy)', fontFamily: 'Nunito Sans, Arial, sans-serif'}}>Loading...</span>
            {/* <Spinner animation="grow" variant="dark" /> */}
        </div>
    );
}

export default Loader;