package models

// ErrorResponse represents a standardized error response
type ErrorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
}

// NewErrorResponse creates a new error response
func NewErrorResponse(status int, message string, err error) *ErrorResponse {
	response := &ErrorResponse{
		Status:  status,
		Message: message,
	}
	if err != nil {
		response.Error = err.Error()
	}
	return response
}
