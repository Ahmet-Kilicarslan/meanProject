



/*middleware*/


//check user for
export function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        console.log('User authenticated');
        return next();
    }else{
        console.log('❌ User not authenticated');
        return res.status(401).json({
            error: 'Authentication required',
            message: 'Please log in to access this resource'
        });
    }
}

export function requireRole(requiredRole) {
    return function(req, res, next) {
        console.log(`🔍 Checking role: ${requiredRole}`);

        // First check if user is authenticated
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const userRole = req.session.role;
        console.log(`User role: ${userRole}, Required: ${requiredRole}`);

        // Allow if user has the required role OR is admin
        if (userRole === requiredRole || userRole === 'admin') {
            console.log('✅ Role authorized');
            return next();
        } else {
            console.log('❌ Insufficient privileges');
            return res.status(403).json({
                error: 'Insufficient privileges',
                message: `This resource requires ${requiredRole} role`,
                userRole: userRole
            });
        }
    };
}

export function requireAdmin(req, res, next) {
    return requireRole('admin')( req, res, next);
}