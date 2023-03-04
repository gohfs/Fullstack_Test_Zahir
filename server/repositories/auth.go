package repositories

import (
	"zahir/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	CreateUser(user models.User) (models.User, error)
	CreateCompany(company models.Company) (models.Company, error)
	Login(email string) (models.User, error)
	GetUser(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) CreateCompany(company models.Company) (models.Company, error) {
	err := r.db.Create(&company).Error

	return company, err
}

func (r *repository) Login(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}
