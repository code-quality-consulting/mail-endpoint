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

export default checkEnvIntruders; 
