import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
}

export default auth


// const auth = (req, res, next) => { 
//     const userRole = req.header("role")
//     if (userRole !== "admin" && userRole !== "librarian") {
//         return res.status(401).json({success: false, message: "Unauthorized"})
//     }
//     next()
// }

// export default auth