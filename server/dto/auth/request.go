package authdto

type RegisterRequest struct {
	Name         string `json:"name" validate:"required"`
	Email        string `json:"email"  validate:"required"`
	Password     string `json:"password" validate:"required"`
	Company_Name string `json:"company_name" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"email"  validate:"required"`
	Password string `json:"password" validate:"required"`
}
