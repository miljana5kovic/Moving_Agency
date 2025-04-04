# A web application for a Moving Agency

A web application developed using .NET, React and SQL Server, the purpose is to display the information needed for a successful move of business premises or households, scheduling a moving estimate, scheduling a move and reviewing the work of the agency as well as its own workers.
Project created as 

![Screenshot 2025-04-04 144127](https://github.com/user-attachments/assets/5df5e22c-f474-4144-ad48-8cc88bc5cc70)

## Login and Register

The new user registration page contains forms for entering names, surname, username, password, and e-mail. These fields are required, the visitor cannot continue with the registration if they are not entered. If entered an invalid email address, it is not possible to create an account. Also, if the user tries to create an account with an existing email in the database registered users, will receive an error message.

![image](https://github.com/user-attachments/assets/e697761d-fbeb-435e-ae90-dc290d1fc813)

The user logs into the system with his email and password. Depending on his role, he has certain privileges to access and work on
system. Authentification was implemented using JWT tokens.

![image](https://github.com/user-attachments/assets/64958259-8aa6-4676-a4e1-18dceeab69ba)

## Scheduling moving estimation

By clicking on the estimates, two options can be selected: Schedule an estimate and List assessment.
On the Schedule an Assessment page, there is a calendar where you can make an appointment a certain date and choose a location.

![image](https://github.com/user-attachments/assets/2d5412c2-2454-4f92-88d1-d545a6ca2871)

After estimation is complete user get a notification and can accept or reject moving date.
Notifications in real time are implemented using SignalR.

![image](https://github.com/user-attachments/assets/66fc9245-c01e-48bd-bf4b-1ede812d677e)

## Project structure

Project is organized in two main directories: [ASP.NET](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/ASP.NET) and [agencija-app](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/agencija-app)

[ASP.NET](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/ASP.NET) directory contains backend code organized with MVC protocol. Directory [Models](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/ASP.NET/Models) contains maped model of database entities, directory [Controllers](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/ASP.NET/Controllers) contains controllers with endpoints.
[agencija-app](https://github.com/miljana5kovic/Moving_Agency/tree/6b34c0699417f3e6c4e392d7a0bd0d159ec767f1/agencija-app) directory contains frontend code developed using React.

## Database structure

![image](https://github.com/user-attachments/assets/650d535b-299d-47db-bb2e-c2a0b9023ff9)


