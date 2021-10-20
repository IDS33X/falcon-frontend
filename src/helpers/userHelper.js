const AddUserMap = (user) => {
    const object = {
        user: {
            departmentId: user.departmentId ?? 1,
            roleId: user.roleId ?? 3,
            username: user.username ?? '',
        
        name: user.name ?? '',
        lastName: user.lastName ?? '',
        code: user.code ?? '',
        password: user.password ?? '1234'
        }
    }

    return JSON.stringify(object)

}

export default AddUserMap;