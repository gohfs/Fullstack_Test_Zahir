package models

import (
	"time"
)

type Company struct {
	ID           int    `json:"id"`
	User_ID      int    `json:"user_id"`
	User         User   `json:"user"`
	Name         string `json:"name" gorm:"type: varchar(255)"`
	Start_Date   time.Time
	Expired_Date time.Time
	Variant_ID   int    `json:"variant_id" gorm:"type: bigint(20)"`
	Status       string `json:"status" gorm:"type: varchar(255)"`
	Created_at   time.Time
	Updated_at   time.Time
}
