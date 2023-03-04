package handlers

import (
	"encoding/json"
	"net/http"
	dto "zahir/dto/result"
	"zahir/repositories"
)

type handlerVariant struct {
	VariantRepository repositories.VariantRepository
}

func HandlerVariant(VariantRepository repositories.VariantRepository) *handlerVariant {
	return &handlerVariant{VariantRepository}
}

func (h *handlerVariant) GetVariants(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	variant, err := h.VariantRepository.GetVariants()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: variant}
	json.NewEncoder(w).Encode(response)
}
