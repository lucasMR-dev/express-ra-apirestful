import englishMessages from 'ra-language-english';

const CustomEnglishMessage = {
    ...englishMessages,
    titles: {
        rrhh: 'Human Resources',
        warehouse: 'Warehouse',
        'Admin Panel': 'Admin Panel'
    },
    languages: {
        Espanol: 'Spanish',
        Deutch: 'Deutch',
        English: 'English',
        Frances: 'French'
    },
    colors: {
        Red: 'Red',
        Green: 'Green',
        Blue: 'Blue',
        Orange: 'Orange',
        Cyan: 'Cyan'
    },
    notifications: {
        'Logged In': 'Logged In',
        'Session Expired': 'Session Expired',
        'Profile Updated': 'Profile Updated'
    },
    Categories: 'Categories',
    Brands: 'Brands',
    resources: {
        profile: {
            name: 'Profile'
        },
        config: {
            name: 'Configuration',
            language: 'Language',
            darkTheme: 'Dark Theme',
            color: 'Color'
        },
        products: {
            name: 'Product |||| Products'
        },
        categories: {
            name: 'Category |||| Categories',
            fields: {
                name: 'Name',
                family:{
                    id: 'Family',
                    name: 'Family'
                }
            },
            names: {
                Mouses: 'Mouses',
                Motherboards: 'Motherboards',
                Headsets: 'Headsets',
                "Graphics Cards": 'Graphics Cards'
            }
        },
        brands: {
            name: 'Brand |||| Brands',
            fields: {
                name: 'Name',
                partnerStatus: 'Partner Status',
                active: 'Active',
                logo: 'Brand Logo',
                categories: 'Categories'
            },
            partnerStatus_choices: {
                Aproved: 'Aproved',
                Pending: 'Pending',
                Refused: 'Refused'
            }
        },
        families: {
            name: 'Family |||| Families',
            fields: {
                name: 'Family',
            }
        },
        departments: {
            name: 'Department |||| Deparments',
            fields:{}
        },
        employees: {
            Profile: 'Profil',
            Company: 'Société',
            Account: 'Compte',
            'Fill Profile Tab first': `Fill Profile Tab first`,
            name: 'Employee |||| Employees',
            fields: {
                position: 'Position',
                job_name: 'Job Name',
                hire_date: `Hire Date`,
                department: 'Department',
                salary: 'Salary',
                profile: {
                    firstname: 'Firstname',
                    lastname: 'Lastname',
                    phone: 'Phone',
                    path: 'Picture'
                },
                user: {
                    username: `Username`,
                    email: 'Email',
                    isActive: `Is Active?`
                },
                firstname: 'Firstname',
                lastname: 'lastname',
                phone: 'Phone',
                path: 'Picture',
                username: `Username`,
                email: 'Email',
                password: 'Password',
                isActive: `Is Active?`
            }
        }
    }
}

export default CustomEnglishMessage