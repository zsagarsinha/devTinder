const adminAuth = (req, res, next) => {
    console.log("Admin authentication is being performed");
    const token = "xyz"; // This should be replaced with actual token verification logic
    const isAuthorized = token ==="xyz"
    if(!isAuthorized)
    {
        res.status(401).send("Unauthorized User")
    } else{
        console.log("Admin authentication is done successfully");
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User authentication is being performed");
    const token = "abc"; // This should be replaced with actual token verification logic
    const isAuthorized = token ==="abc"
    if(!isAuthorized)
    {
        res.status(401).send("Unauthorized User")
    } else{
        console.log("User authentication is done successfully");
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}