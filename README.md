# React Task Manager

### Features
* Add/Update/Remove tasks
* Set email reminder for task
* Bulk remove tasks
* Bulk edit task status
* Search by title

### Backend Design
![Serverless design](https://github.com/dpkm95/react-task-manager/blob/master/docs/design.png)

### TODO
#### Features
* Support task due-time and remaind x duration before task due
* User management: login & email verification
* Get tasks by id
* Support task tagging & search
#### TechDebt
* Tighten AWS Roles
* Stop running state-machine if remainder is rescheduled
* Soft delete on tasks removal
* Host using Route 53