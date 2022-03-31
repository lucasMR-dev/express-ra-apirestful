import englishMessages from 'ra-language-english';

const CustomEnglishMessage = {
    ...englishMessages,
    titles: {
        rrhh: 'Human Resources',
        warehouse: 'Warehouse'
    },
    Categories: 'Categories',
    Brands: 'Brands',
    resources: {
        profile: {
            name: 'Profile'
        },
        config: {
            name: 'Configuration'
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