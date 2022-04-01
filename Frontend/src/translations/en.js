import englishMessages from 'ra-language-english';

const CustomEnglishMessage = {
    ...englishMessages,
    titles: {
        rrhh: 'Human Resources',
        warehouse: 'Warehouse'
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
            name: 'Employee |||| Employees',
            fields: {}
        }
    }
}

export default CustomEnglishMessage