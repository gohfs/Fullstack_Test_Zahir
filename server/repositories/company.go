package repositories

import (
	"zahir/models"

	"gorm.io/gorm"
)

type CompanyRepository interface {
	GetCompanies() ([]models.Company, error)
	AddUser(ID int) (models.User, error)
	GetCompanyByName(name models.Company) (models.Company, error)
	Subscribe(company models.Company) (models.Company, error)
	GetVariant(variant models.Variant) (models.Variant, error)
	UpdateCompany(company models.Company) (models.Company, error)
}

func RepositoryCompany(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetCompanies() ([]models.Company, error) {
	var companies []models.Company
	err := r.db.Preload("User").Find(&companies).Error

	return companies, err
}
func (r *repository) AddUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Where("ID=?", ID).First(&user).Error

	return user, err
}

func (r *repository) GetCompanyByName(name models.Company) (models.Company, error) {
	var company models.Company
	err := r.db.Where("name = ?", name).First(&company).Error

	return company, err
}

func (r *repository) Subscribe(company models.Company) (models.Company, error) {
	err := r.db.Create(&company).Error

	return company, err
}

func (r *repository) GetVariant(variant models.Variant) (models.Variant, error) {
	err := r.db.Find(&variant).Error

	return variant, err
}

func (r *repository) UpdateCompany(company models.Company) (models.Company, error) {
	err := r.db.Model(&company).Updates(company).Error

	return company, err
}
