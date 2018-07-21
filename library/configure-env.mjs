function checkEnvIntruders(envVariables, allowedVariables = []) {
    const envNames = Object.keys(envVariables);
    const unauthorizedVariables = envNames.filter((envVariableName) =>
        !allowedVariables.includes(envVariableName)
    );
    if (unauthorizedVariables.length === 0) {
        return false;
    }
    return true; 
}

/*function configureEnv() {
    process.env.PORT = 3001;
    return (callback) => callback();
}*/

export default checkEnvIntruders; 
