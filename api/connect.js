import mysql from 'mysql2'

export const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'zeka291194',
	database: "social-media"
})