package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	dto "zahir/dto/result"
	subscribedto "zahir/dto/subscribe"
	"zahir/models"
	"zahir/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerCompany struct {
	CompanyRepository repositories.CompanyRepository
}

func HandlerCompany(CompanyRepository repositories.CompanyRepository) *handlerCompany {
	return &handlerCompany{CompanyRepository}
}

func (h *handlerCompany) GetCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	company, err := h.CompanyRepository.GetCompanies()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: company}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCompany) Subscribe(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userID := int(userInfo["id"].(float64))

	request := new(subscribedto.SubscribeRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	variant, err := h.CompanyRepository.GetVariant(models.Variant{})
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// create a new company
	company := models.Company{
		User_ID:      userID,
		Name:         request.Company_Name,
		Start_Date:   time.Now(),
		Expired_Date: time.Now().Add(time.Hour * 24 * time.Duration(variant.Subscribe_Period_Day)),
		Variant_ID:   request.Variant_ID,
		Status:       "Subscribed",
		Created_at:   time.Now(),
		Updated_at:   time.Now(),
	}

	subscribe, err := h.CompanyRepository.Subscribe(company)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	if request.Company_Name == "" {
		subscribe.Name = request.Company_Name
	}
	if request.Variant_ID == 0 {
		subscribe.Variant_ID = request.Variant_ID
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: subscribe}
	json.NewEncoder(w).Encode(response)

}
