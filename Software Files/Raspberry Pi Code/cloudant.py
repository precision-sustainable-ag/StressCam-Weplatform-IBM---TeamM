import ibm_db

conn = ibm_db.connect("DATABASE=bludb;HOSTNAME=768f4842-40ae-4aa3-a0c9-2abb261fea13.bv7c3o6d0vfhru3npds0.databases.appdomain.cloud;PORT=30134;PROTOCOL=TCPIP;UID=io8wnzpa;PWD=bI6OwCPgTI3A5nOL;", "", "")
def results(command):
    from ibm_db import fetch_assoc

    ret = []
    result = fetch_assoc(command)
    while result:
        # This builds a list in memory. Theoretically, if there's a lot of rows,
        # we could run out of memory. In practice, I've never had that happen.
        # If it's ever a problem, you could use
        #     yield result
        # Then this function would become a generator. You lose the ability to access
        # results by index or slice them or whatever, but you retain
        # the ability to iterate on them.
        ret.append(result)
        result = fetch_assoc(command)
    return ret  # Ditch this line if you choose to use a generator.