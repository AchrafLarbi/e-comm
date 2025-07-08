import Spinner from 'react-bootstrap/Spinner';

function Loader({size=100}) {
    return (
        <div>
            <Spinner animation="border" variant="primary" role='status'
            className='d-block m-auto'
            style={{height:`${size}px`,
                width:`${size}px`
            }}
            >
               
            </Spinner>
            <span className='sr-only'>Loading...</span>
            {/* <Spinner animation="grow" variant="dark" /> */}
        </div>
    );
}

export default Loader;