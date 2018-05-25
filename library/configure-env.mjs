function configureEnv() {
    process.env.PORT = 3001;
    return (callback) => callback();
}

export default configureEnv; 
