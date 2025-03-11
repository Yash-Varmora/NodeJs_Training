const role = (req, res, next) => {
    if(!req.user || (req.user.role !== "admin" && req.user.role !== "librarian")) {
        return res.status(401).json({ success: false, message: "Access denied. Only admin or librarian can perform this action."})
    }
    next()
}

export default role