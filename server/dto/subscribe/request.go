package subscribedto

type SubscribeRequest struct {
	Company_Name string `json:"company_name" validate:"required"`
	Variant_ID   int    `json:"variant_id" validate:"required"`
}
