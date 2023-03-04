package repositories

import (
	"zahir/models"

	"gorm.io/gorm"
)

type VariantRepository interface {
	GetVariants() ([]models.Variant, error)
}

func RepositoryVariant(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetVariants() ([]models.Variant, error) {
	var variants []models.Variant
	err := r.db.Find(&variants).Error

	return variants, err
}
