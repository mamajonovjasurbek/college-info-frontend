const ErrorPage = (error: Error) => {
    return (
        <>
            <p>Message : {error.message}</p>
            <p>Stack : {error.stack}</p>
            <p>Name : {error.name}</p>
        </>
    );
};

export default ErrorPage;
