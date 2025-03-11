const errorMiddleware = (err, req, res, next) => { 
    console.error("Error:", err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ success: false, message: err.message || "Internal server error" });
}

export default errorMiddleware;