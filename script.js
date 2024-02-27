$(document).ready(function() {
    let students = [
        {primary_id: 1, id: 1902409, name: 'John', age: 20, email: "john@gmail.com", contact: '09123456789'},
        {primary_id: 2, id: 1903245, name: 'Johny', age: 22, email: "johny@gmail.com", contact: '09123456789'},
        {primary_id: 3, id: 1904323, name: 'Joseph', age: 21, email: "joseph@gmail.com", contact: '09123456789'},
    ];

    function displayStudentList() {
        $('#studentList').empty();
        $.each(students, function(index, students) {
            $('#studentList').append(
                '<tr>' +
                '<td>' + students.id + '</td>' +
                '<td>' + students.name + '</td>' +
                '<td>' + students.age + '</td>' +
                '<td>' + students.email + '</td>' +
                '<td>' + students.contact + '</td>' +
                '<td class="btn">' + '<button class="editBtn" data-id="'+ students.primary_id +'">Edit</button>'
                + '<button class="deleteBtn" data-id="'+ students.primary_id +'">Delete</button>' + 
                '</td>' +
                '</tr>'
            );
        });
    }

    function clearFields() {
        $('#studNumber').val('');
        $('#name').val('');
        $('#age').val('');
        $('#email').val('');
        $('#contact').val('');
    }

    displayStudentList();

    $(document).on('click', '#addStudentBtn', function(){
        $('#addStudentModal').show();
    });

    $(document).on('click', '.editBtn', function(){
        let studentId = $(this).data('id');
        let student = students.find(function(s) { return s.primary_id === studentId; });
        $('#primary_id').val(student.primary_id);
        $('#editStudNumber').val(student.id);
        $('#editName').val(student.name);
        $('#editAge').val(student.age);
        $('#editEmail').val(student.email);
        $('#editContact').val(student.contact);
        $('#editStudentModal').show();
    });

    $(document).on('click', '.deleteBtn', function(){
        let studentId = $(this).data('id');
        $('#confirmDelete').data('id', studentId);
        $('#deleteStudentModal').show();
    });

    $(document).on('click', '#confirmDelete', function(){
        let studentId = $(this).data('id');
        students = students.filter(function(s) { return s.primary_id != studentId; });
        displayStudentList();
        $('#deleteStudentModal').hide();
    });

    $(document).on('click', '.close', function(){
        $('.modal').hide();
    });

    $(document).on('submit', '#addStudentForm', function(e){
        e.preventDefault();
        let newStudent = {
            primary_id: students.length + 1,
            id: $('#studNumber').val(),
            name: $('#name').val(),
            age: $('#age').val(),
            email: $('#email').val(),
            contact: $('#contact').val(),
        };
        students.push(newStudent);
        displayStudentList();
        clearFields();
        $('#addStudentModal').hide();
    });

    $(document).on('submit', '#editStudentForm', function(e){
        e.preventDefault();
        let studentId = $('#primary_id').val();
        let studentIndex = students.findIndex(function(s) { return s.primary_id == studentId; });
        students[studentIndex].id = $('#editStudNumber').val();
        students[studentIndex].name = $('#editName').val();
        students[studentIndex].age = $('#editAge').val();
        students[studentIndex].email = $('#editEmail').val();
        students[studentIndex].contact = $('#editContact').val();
        displayStudentList();
        clearFields();
        $('#editStudentModal').hide();
    });
});