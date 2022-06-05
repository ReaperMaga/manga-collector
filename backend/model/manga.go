package model

type Manga struct {
	ID      string `json:"id" bson:"id"`
	Title   string `bson:"title" json:"title"`
	Url     string `bson:"url" json:"url"`
	Poster  string `json:"poster" bson:"poster"`
	Chapter string `json:"chapter" bson:"chapter"`
}
