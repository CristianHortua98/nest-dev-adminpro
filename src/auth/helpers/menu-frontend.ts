export const getMenuFrontEnd = (role) => {

    const menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/'},
                { titulo: 'ProgressBar', url: 'progress'},
                { titulo: 'Graficas', url: 'grafica1'},
                { titulo: 'Promesas', url: 'promesas'},
                { titulo: 'RxJs', url: 'rxjs'}
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Users', url: 'users'},
                { titulo: 'Hospitals', url: 'hospitals'},
                { titulo: 'Doctors', url: 'doctors'}
            ]
        }
    ]

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Users', url: 'users'});
    }

    return menu;

}