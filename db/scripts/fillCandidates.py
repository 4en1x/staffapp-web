import random
from faker import Factory
fake = Factory.create()

idStart = 50
idEnd = 100

sql = 'INSERT INTO candidates (id,name,surname,email,primary_skill,skype,phone,resume,status_id,english_level_id,created_date,last_change_date,user_id,city_id,salary,primary_skill_year_start) VALUES'

for i in range(idStart, idEnd):
    sql += '(' + str(i) + ',"' + fake.first_name() + '","' + fake.last_name() + '","' + fake.safe_email() + '", ' + str(random.randint(1, 19)) + ',"' + fake.user_name() + '","'+ fake.phone_number() + '","' + fake.url() +'",' + str(random.randint(1, 10)) + ',' +  str(random.randint(1, 7)) + ',' + '"2009-06-04 18:13:56","2009-06-04 18:13:56"' + ',' + str(2) +','+str(random.randint(1, 6)) + ',' + '5000' +','+ '2016),'
sql = sql[:-1]+';'
print(sql)

sql = 'INSERT INTO skills_has_candidates (candidate_id,skill_id) VALUES'
for i in range(idStart, idEnd):
    x = random.randint(1, 7)
    mas = []
    for j in range(0, x):
        l = random.randint(20,30)
        if not l in mas:
            sql += '('+str(i)+','+str(l) + '),'
            mas.append(l)
sql=sql[:-1]+';'
print(sql)

sql = 'INSERT INTO links (candidate_id,link) VALUES'
for i in range(idStart, idEnd):
    x = random.randint(1, 7)
    for j in range(0, x):
        sql += '('+str(i)+',"'+fake.url() + '"),'
sql = sql[:-1]+';'
print(sql)
