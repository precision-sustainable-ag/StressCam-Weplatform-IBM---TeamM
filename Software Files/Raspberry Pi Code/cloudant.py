import ibm_db
def main():
    conn = ibm_db.connect("DATABASE=bludb;HOSTNAME=768f4842-40ae-4aa3-a0c9-2abb261fea13.bv7c3o6d0vfhru3npds0.databases.appdomain.cloud;PORT=30134;PROTOCOL=TCPIP;SECURITY=SSL;UID=i9q1pe57;PWD=IciMVILsiZkhgBQh;", '', '')

    ibm_db.exec_immediate(conn, "insert into I9Q1PE57.CAMERA (DEVICE_ID,LATITUDE,LONGITUDE,WATER_STRESS_LEVEL,WITTYPI_TEMPERATURE,DATE_1,TIME_1) values('1','2','3',4,5,6,'7')")