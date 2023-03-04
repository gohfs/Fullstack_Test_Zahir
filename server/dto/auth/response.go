package authdto

type LoginResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Role  string `json:"role"`
	Token string `json:"token"`
}
