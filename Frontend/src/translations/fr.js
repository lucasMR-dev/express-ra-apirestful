import frenchMessages from 'ra-language-french';

const CustomFrenchMessage = {
    ...frenchMessages,
    titles: {
        rrhh: 'Ressources Humaines',
        warehouse: 'Dépot'
    },
    languages: {
        Espanol: 'Espagnol',
        Deutch: 'Allemand',
        English: 'Anglais',
        Frances: 'Français'
    },
    colors: {
        Red: 'Rouge',
        Green: 'Verte',
        Blue: 'Bleu',
        Orange: 'Orange',
        Cyan: 'Cyan'
    },
    Categories: 'Catégories',
    Brands: 'Marques',
    resources: {
        profile: {
            name: 'Profil'
        },
        config: {
            name: 'Configuration',
            language: 'Langue',
            darkTheme: 'Foncé Thème',
            color: 'Couleur'
        },
        products: {
            name: 'Produit |||| Des Produits',
            fields: {
                name: 'Nom',
                description: 'Description',
                brand: {
                    name: 'Marque'
                },
                partnerStatus: 'Statut de Partenaire',
                shortDetails: 'Petits Détails',
                stock: 'Stock',
                sale: 'Vendre',
                price: 'Le Prix',
                discount: 'Remise',
                salePrice: 'Prix de Vente',
                colorAvailable: 'Couleurs Disponibles',
                categories: 'Catégories',
                tags: 'Étiquettes',
            }
        },
        categories: {
            name: 'Catégorie |||| Catégories',
            fields: {
                name: 'Nom',
                family: {
                    id: 'Famille',
                    name: 'Famille'
                }
            },
            names: {
                Mouses: 'Des Souris',
                Motherboards: 'Cartes Mères',
                Headsets: 'Casques',
                "Graphics Cards": 'Cartes Graphiques'
            }
        },
        brands: {
            name: 'Marque |||| Marques',
            fields: {
                name: 'Nom',
                partnerStatus: 'Statut de Partenaire',
                active: 'Actif',
                logo: 'Logo',
                newlogo: 'Nouveau Logo?',
                categories: 'Catégories'
            },
            partnerStatus_choices: {
                Aproved: 'Approuvé',
                Pending: 'En Attente',
                Refused: 'Refusé'
            }
        },
        families: {
            name: 'Famille |||| Des Familles',
            fields: {
                name: 'Famille'
            }
        },
        departments: {
            name: 'Département |||| Départements',
            fields: {
                name: 'Nom',
                code: 'Code',
                location: 'Lieu',
                managers: 'Managers',
                employees: 'Employés'
            }
        },
        employees: {
            name: 'Employé |||| Employés',
            fields: {
                position: 'Position',
                job_name: 'Nom du Travail',
                hire_date: `Date d' embauche`,
                department: 'Département',
                salary: 'Salaire',
                profile: {
                    firstname: 'Prénom',
                    lastname: 'Nom de Famille',
                    phone: 'Téléphone',
                    path: 'Photo'
                },
                user: {
                    username: `nom d'utilisateur`,
                    email: 'E-mail',
                    isActive: `C'est Actif?`
                }
            }
        }
    }
}

export default CustomFrenchMessage