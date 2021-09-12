import mysql.connector
import random

class Controller():

    def __init__(self):

        self.mydb = mysql.connector.connect(host='bkjd4bperxq5p5vaqjrk-mysql.services.clever-cloud.com', user='uvluoi7yubvndnjk', password='Ev2KlWre5wz1PnhxZGyx', database='bkjd4bperxq5p5vaqjrk')

    def get_words(self):

        myCursor = self.mydb.cursor()
        myCursor.execute('Select word from words_list')
        words = myCursor.fetchall()
        words = [word[0] for word in words]
        return (random.sample(words,5))

    def enter_guest_record(self,name):

        words = self.get_words()

        # enter guest record in database
        myCursor = self.mydb.cursor()
        myCursor.execute("Insert into guest_games_data (Guest_Name,Score,Assigned_Words,Date) values ('{}',{},'{}',curdate())".format(name.upper(),0,",".join(words)))
       
        # get guest id 
        myCursor.execute('select LAST_INSERT_ID()')
        id = myCursor.fetchall()[0][0]
        self.mydb.commit()
        self.mydb.close()
        return {'id':id,'words':words,'attempt_no':None}

    def enter_employee_record(self,email,emp_id,attempt_no):
        
        myCursor = self.mydb.cursor()
        
        # check if employee has just logged in
        if(attempt_no == ""):
        
            # get the next attempt_no
            myCursor.execute('select max(attempt_no) from employee_games_data where Employee_Id = {}'.format(int(emp_id)))
            results = myCursor.fetchall()
            attempt_no = 1 if results[0][0] == None else (results[0][0] + 1)

            # get the words
            words = self.get_words()

            # insert new record
            myCursor.execute("Insert into employee_games_data values ({},'{}',{},{},'{}',curdate())".format(int(emp_id),email,0,attempt_no,",".join(words)))
            self.mydb.commit()
            self.mydb.close()

            return {'id':None,'words':words,'attempt_no':attempt_no}

    def enter_user(self,details):

        # check for guest or employee
        if (details['as_guest']):
            return self.enter_guest_record(details['name'])
        else:
            return self.enter_employee_record(details['email'],details['emp_id'],details['attempt_no'])

    def update_guest_score(self,id,score):

        myCursor = self.mydb.cursor()
        myCursor.execute("Update guest_games_data set Score = {} where Guest_ID = {}".format(int(score),int(id)))
        self.mydb.commit()
        self.mydb.close()
        return "OK"

    def update_employee_score(self,id,attempt_no,score):

        myCursor = self.mydb.cursor()
        myCursor.execute("Update employee_games_data set Score = {} where (Employee_Id = {} and Attempt_No = {})".format(int(score),int(id),int(attempt_no)))
        self.mydb.commit()
        self.mydb.close()
        return "OK"

    def update_score(self,scoreDetails):

        # check for guest or employee
        if (scoreDetails['isGuest']):
            return self.update_guest_score(scoreDetails['id'],scoreDetails['new_score'])
        else:
            return self.update_employee_score(scoreDetails['id'],scoreDetails['attempt_no'],scoreDetails['new_score'])

