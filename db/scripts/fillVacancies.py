import random
from faker import Factory
fake = Factory.create()

idStart = 50
idEnd = 100

sql = 'INSERT INTO vacancies (id, city_id, name, status_id, job_start,created_date,salary,primary_skill,description) VALUES'

for i in range(idStart, idEnd):
    sql += '(' + str(i) + ',' + str(random.randint(1, 6)) + ',"Work in '+ fake.company() + '",' + str(random.randint(1, 9)) + ',"' + fake.date(pattern="%Y-%m-%d") + '",' + '"2009-06-04 18:13:56",' + str(5000) + ',' + str(random.randint(1, 19))+ ',"' + fake.text(max_nb_chars=200, ext_word_list=None) + '"),'
sql = sql[:-1]+';'
print(sql)

sql = 'INSERT INTO vacancy_has_skills (vacancy_id,skill_id,weight) VALUES'
for i in range(idStart, idEnd):
    x = random.randint(1, 7)
    mas = []
    for j in range(0, x):
        l = random.randint(20,30)
        if not l in mas:
            sql += '('+str(i)+','+str(l) + ',5),'
            mas.append(l)
sql = sql[:-1] + ';'
print(sql)