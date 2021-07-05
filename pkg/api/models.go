package api

type AddItemRequest struct {
	Name string `json:"name"`
}

type DeleteItemRequest struct {
	Id int `json:"id"`
}
