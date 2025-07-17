const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
    console.log('Admin Middleware user:', req.user);
  } else {
    res.status(403).json({ message: 'Admin access denied' });
  }
};

export default admin;