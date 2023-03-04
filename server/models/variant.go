package models

import "time"

type Variant struct {
	ID                   int       `json:"id"`
	Name                 string    `json:"name" gorm:"type: varchar(255)"`
	Subscribe_Period_Day int       `json:"subscribe_period_day" gorm:"type: int"`
	Price                int       `json:"price" gorm:"type: int"`
	Description          string    `json:"description" gorm:"type: varchar(255)"`
	Created_at           time.Time `json:"-"`
	Updated_at           time.Time `json:"-"`
}
