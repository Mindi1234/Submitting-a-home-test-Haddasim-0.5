CREATE DATABASE FamilyConnection;

--����� ���� ���� ������
CREATE TABLE Persons (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50),
    Family_Name VARCHAR(50),
    Gender VARCHAR(10),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
	FOREIGN KEY (Father_Id) REFERENCES Persons(Person_Id),
    FOREIGN KEY (Mother_Id) REFERENCES Persons(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES Persons(Person_Id)
);

-- ����� ������ 
INSERT INTO Persons (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES 
(1, '���', '���', '���', NULL, NULL, 2),
(2, '���', '���', '����', NULL, NULL, 1),
(3, '����', '���', '���', 1, 2, NULL),
(4, '���', '���', '����', 1, 2, NULL),
(5, '�����', '���', '����', NULL, NULL, 3),
(6, '����', '���', '���', 3, 5, NULL);

--����� ���� �����
CREATE TABLE Relations (
 Person_Id INT,
 Relative_Id INT,
 Connection_Type VARCHAR(10),
 PRIMARY KEY (Person_Id, Relative_Id),
    FOREIGN KEY (Person_Id) REFERENCES Persons(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES Persons(Person_Id)
)

--����� ��� �� ��
INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
Select Person_Id, Father_Id, '��'
From Persons
Where Father_Id IS NOT NULL;

--����� ��� �� ��
INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
Select Person_Id, Mother_Id, '��'
From Persons
Where Father_Id IS NOT NULL;

--����� ��� �� ��\�� ���
INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
Select Person_Id, Spouse_Id,
       Case When Gender = '���' THEN '�� ���' ELSE '�� ���' END
From Persons
Where Spouse_Id IS NOT NULL;

--����� ��� �� �� ��� ��\��
INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
Select P.Person_Id,C.Person_Id,
		Case When C.Gender = '���' THEN '��' ELSE '��' END
From Persons As C
Join Persons As P ON C.Father_Id = P.Person_Id OR
					C.Mother_Id = P.Person_Id
WHERE P.Person_Id IS NOT NULL;

--����� ��� ��� ����\�����
INSERT INTO Relations (Person_Id, Relative_Id, Connection_Type)
Select S1.Person_Id,S2.Person_Id,
		Case When S2.Gender = '���' THEN '��' ELSE '����' END
from Persons AS s1 join Persons AS s2
   ON (s1.Person_Id != s2.Person_Id)
   AND (
        (s1.Father_Id IS NOT NULL AND s1.Father_Id = s2.Father_Id)
     OR (s1.Mother_Id IS NOT NULL AND s1.Mother_Id = s2.Mother_Id)
   )



--Update person
--Set Spouse_Id = other.Person_Id
--from Person AS person
--Join Person AS other ON other.Spouse_Id = person.Person_Id
--Where person.Spouse_Id is null

UPDATE p
SET p.Spouse_Id = r.Person_Id
FROM Persons p
JOIN Relations r  ON p.Person_Id = r.Relative_Id
WHERE p.Spouse_Id IS NULL
 AND r.Connection_Type IN ('�� ���', '�� ���')
