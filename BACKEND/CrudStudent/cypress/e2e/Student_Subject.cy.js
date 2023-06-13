describe('Student/Subject API Tests', () => {
    let createdStudentId;

    beforeEach(() => {
        cy.visit('https://localhost:7151/swagger/');
    });

    it('should get all students', () => {
        cy.request('GET', '/api/Student/GetStudent').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should create a new student', () => {
        const student = {
            studentId: 0,
            firstName: "Alex",
            lastName: "Pop",
            age: 21,
            budget: "YES"
        };

        cy.request('POST', '/api/Student/PostStudent', student).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('firstName', student.firstName);
            expect(response.body).to.have.property('lastName', student.lastName);
            expect(response.body).to.have.property('age', student.age);
            expect(response.body).to.have.property('budget', student.budget);

            // Salvam ID-ul studentului creat pentru a fi folosit în alte teste
            createdStudentId = response.body.studentId;
        });
    });

    it('should get a specific student', () => {
        // Verificam daca exista un ID de student creat anterior
        if (createdStudentId) {
            cy.request('GET', `/api/Student/GetStudent/${createdStudentId}`).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('studentId', createdStudentId);
            });
        } else {
            cy.log('Niciun student creat anterior pentru a efectua testul de get.');
        }
    });

    it('should update an existing student', () => {
        // Verificam daca exista un ID de student creat anterior
        if (createdStudentId) {
            const updatedStudent = {
                studentId: createdStudentId,
                firstName: "fName",
                lastName: "lName",
                age: 21,
                budget: "YES"
            };

            cy.request('PUT', `/api/Student/PutStudent/${createdStudentId}`, updatedStudent).then((response) => {
                expect(response.status).to.equal(200);
            });
        } else {
            cy.log('Niciun student creat anterior pentru a efectua testul de update.');
        }
    });

    //SUBJECT

    let createdStudentId2;
    let createdSubjectId;
    let createdSubjectId2;


    it('should get all subjects', () => {
        cy.request('GET', '/api/Subject/GetSubject').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should create a new subject', () => {
        const subject = {
            subjectId: 0,
            subjectName: "string",
            mark: 2,
            studentId: createdStudentId,
        };

        cy.request('POST', '/api/Subject/PostSubject', subject).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('subjectName', subject.subjectName);
            expect(response.body).to.have.property('mark', subject.mark);
            expect(response.body).to.have.property('studentId', subject.studentId);

            // Salvam ID-ul subjectului creat pentru a fi folosit în alte teste
            createdSubjectId = response.body.subjectId;
        });
    });

    it('should get a specific subject', () => {
        // Verificam daca exista un ID de subject creat anterior
        if (createdSubjectId) {
            cy.request('GET', `/api/Subject/GetSubject/${createdSubjectId}`).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('subjectId', createdSubjectId);
            });
        } else {
            cy.log('Niciun subject creat anterior pentru a efectua testul de get.');
        }
    });

    it('should update an existing subject', () => {
        // Verificam daca exista un ID de subject creat anterior
        cy.wait(5000);
        if (createdSubjectId) {
            const updatedSubject = {
                subjectId: createdSubjectId,
                subjectName: "string",
                mark: 10,
                studentId: createdStudentId,
            };

            cy.request('PUT', `/api/Subject/PutSubject/${createdSubjectId}`, updatedSubject).then((response) => {
                expect(response.status).to.equal(200);
            });
        } else {
            cy.log('Niciun subject creat anterior pentru a efectua testul de update.');
        }
    });

    it('should delete an existing subject', () => {
        // Verificam daca exista un ID de subject creat anterior
        if (createdSubjectId) {
            cy.request('DELETE', `/api/Subject/DeleteSubject/${createdSubjectId}`).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        } else {
            cy.log('Niciun subject creat anterior pentru a efectua testul de delete.');
        }
    });

    it('should delete an existing student', () => {
        // Verificam daca exista un ID de student creat anterior
        if (createdStudentId) {
            cy.request('DELETE', `/api/Student/DeleteStudent/${createdStudentId}`).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        } else {
            cy.log('Niciun student creat anterior pentru a efectua testul de delete.');
        }
    });


    it('should get subject by studentID', () => {
        const student = {
            studentId: 0,
            firstName: "Alex",
            lastName: "Pop",
            age: 21,
            budget: "YES"
        };

        cy.request('POST', '/api/Student/PostStudent', student).then((response) => {
            expect(response.status).to.equal(201);

            // Salvam ID-ul studentului creat pentru a fi folosit în alte teste
           createdStudentId2 = response.body.studentId;
        });

        const subject = {
            subjectId: 0,
            subjectName: "string",
            mark: 2,
            studentId: createdStudentId,
        };

        cy.request('POST', '/api/Subject/PostSubject', subject).then((response) => {
            expect(response.status).to.equal(201);

            // Salvam ID-ul subjectului creat pentru a fi folosit în alte teste
            createdSubjectId = response.body.subjectId;
        });

        const subject2 = {
            subjectId: 0,
            subjectName: "string2",
            mark: 5,
            studentId: createdStudentId2,
        };

        cy.request('POST', '/api/Subject/PostSubject', subject2).then((response) => {

            // Salvam ID-ul subjectului creat pentru a fi folosit în alte teste
            createdSubjectId2 = response.body.subjectId;
        });

    
            // Verificam daca exista un ID de subject creat anterior
            if (createdStudentId2) {
                cy.request('GET', `/api/Subject/GetSubjectsByStudentId/${createdStudentId2}`).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body[0]).to.have.property('studentId', createdStudentId2);
                    expect(response.body[1]).to.have.property('studentId', createdStudentId2);
                });
            } else {
                cy.log('Niciun subject creat anterior pentru a efectua testul de get.');
            }
        
    });

    it('delete subjects by studentID', () => {
        const student = {
            studentId: 0,
            firstName: "Alex",
            lastName: "Pop",
            age: 21,
            budget: "YES"
        };

        cy.request('POST', '/api/Student/PostStudent', student).then((response) => {
            expect(response.status).to.equal(201);

            // Salvam ID-ul studentului creat pentru a fi folosit în alte teste
            createdStudentId2 = response.body.studentId;
        });

        const subject = {
            subjectId: 0,
            subjectName: "string",
            mark: 2,
            studentId: createdStudentId,
        };

        cy.request('POST', '/api/Subject/PostSubject', subject).then((response) => {
            expect(response.status).to.equal(201);

            // Salvam ID-ul subjectului creat pentru a fi folosit în alte teste
            createdSubjectId = response.body.subjectId;
        });

        const subject2 = {
            subjectId: 0,
            subjectName: "string2",
            mark: 5,
            studentId: createdStudentId2,
        };

        cy.request('POST', '/api/Subject/PostSubject', subject2).then((response) => {

            // Salvam ID-ul subjectului creat pentru a fi folosit în alte teste
            createdSubjectId2 = response.body.subjectId;
        });

            // Verificam daca exista un ID de student creat anterior
            if (createdStudentId2) {
                cy.request('DELETE', `/api/Subject/DeleteSubjects/${createdStudentId2}`).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.empty;
                });
            } else {
                cy.log('Niciun student creat anterior pentru a efectua testul de delete.');
            }

    });

});