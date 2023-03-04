package database

import (
	"fmt"

	"zahir/models"
	"zahir/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Company{},
		&models.Variant{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
