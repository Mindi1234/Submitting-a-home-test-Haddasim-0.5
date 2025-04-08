package org.example;

import org.apache.parquet.example.data.Group;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.parquet.hadoop.example.GroupReadSupport;
import org.apache.hadoop.fs.Path;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SplitToFiles {

//הפונקציות המחודשות כדי לקרוא קובץ מסוג parquet
    public static void splitFile(String filename) throws IOException {//פונקציה בשביל לשלוח את הקובץ לפונקציה שיכולה לקרוא אותו בצורה מתאימה
        Map<LocalDate, Map<Integer, List<Double>>> hashMap;
        if (filename.endsWith(".csv")) {
            hashMap = readCsvFile(filename);
        } else if (filename.endsWith(".parquet")) {
            hashMap = readParquetFile(filename);
        } else {
            throw new IllegalArgumentException("Unsupported file");
        }
        writeFiles(hashMap);
    }

    private static Map<LocalDate, Map<Integer, List<Double>>> readCsvFile(String filename) throws IOException {//פונקציה לקריאת הקובץ מסוג CSV ולהכניס את הערכים לתוך טבלת גיבוב
        Map<LocalDate, Map<Integer, List<Double>>> hashMapPerDate = new HashMap<>();
        File file = new File(filename);
        BufferedReader br = new BufferedReader(new FileReader(file));
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("timestamp,value")) {
                continue;
            }
            String[] parts = line.split(",");
            if (parts.length < 2 || !Tests.isNumber(parts[1])){
                continue;
            }
            LocalDateTime dateTime = LocalDateTime.parse(parts[0], format);
            double value = Double.parseDouble(parts[1]);
            LocalDate date = dateTime.toLocalDate();
            int hour = dateTime.getHour();

            hashMapPerDate.computeIfAbsent(date, k -> new HashMap<>())
                          .computeIfAbsent(hour, k -> new ArrayList<>())
                          .add(value);
        }
        br.close();
        return hashMapPerDate;
    }

    private static Map<LocalDate, Map<Integer, List<Double>>> readParquetFile(String filename) throws IOException {//פונקציה לקריאת הקובץ מסוג PARQUET ולהכניס את הערכים לתוך טבלת גיבוב
        Map<LocalDate, Map<Integer, List<Double>>> hashMapPerDate = new HashMap<>();
        ParquetReader<Group> reader = ParquetReader.builder(new GroupReadSupport(),new Path(filename)).build();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        Group line;
        while ((line = reader.read()) != null) {
            String timestamp = line.getString("timestamp", 0);
            double value = line.getDouble("value",0);
            if (value == 0 || !Tests.isNumber(String.valueOf(value))){
                continue;
            }
            LocalDateTime dateTime = LocalDateTime.parse(timestamp, format);
            LocalDate date = dateTime.toLocalDate();
            int hour = dateTime.getHour();

            hashMapPerDate.computeIfAbsent(date, k -> new HashMap<>())
                          .computeIfAbsent(hour, k -> new ArrayList<>())
                          .add(value);
        }
        reader.close();
        return hashMapPerDate;
    }

    private static void writeFiles(Map<LocalDate, Map<Integer, List<Double>>> hashMap) throws IOException {
        for (Map.Entry<LocalDate, Map<Integer, List<Double>>> entry : hashMap.entrySet()) {
            LocalDate date = entry.getKey();
            Map<Integer, List<Double>> value = entry.getValue();
            String nameFile = "file_date_" + date + ".csv";
            FileWriter writer = new FileWriter(nameFile);
            writer.write("start time,value\n");
                for (Map.Entry<Integer,List<Double>> hourEntry : value.entrySet()) {
                    int hour = hourEntry.getKey();
                    List<Double> values = hourEntry.getValue();
                    double avg=0;
                    for (double v : values) {
                        avg+=v;
                    }
                    avg=avg/values.size();
                    writer.write(hour+","+avg+"\n");
                }
                writer.close();
            }
    }



    // פונקציה לתרגיל 2 לפני השינוי של לחלק לכמה פונקציות כדי לקרוא את הקובץ ולכתוב את המיני קבצים
//    public static void  splitFile(String filename) throws IOException {//פונקציה ליצירת מחרוזת של שורות בגודל שומגדר לה שנשלחת לפונקציה שיוצרת מיני קובץ בגודל שומגדר לקובץ עם רשימת השורות שנשלחו אליה עד שניגמר כל השורות
//        File file = new File(filename);//יצירת הקובץ לקריאה
//        BufferedReader br = new BufferedReader(new FileReader(file));
//        DateTimeFormatter form = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");//מגדיר משתנה שיוכל לקרוא את המחרוזת תאריך ושעה מהעמודה הראשונה בקובץ
//        Map<LocalDate, Map<Integer, List<Double>>> hashMapPerDate = new HashMap<>();
//        String line;
//        while ((line = br.readLine()) != null) {
//            if(line.contains("timestamp,value")){
//                continue;
//            }
//            String[] parts = line.split(",");
//            if (parts.length < 2 || !Tests.isNumber(parts[1])) {
//                continue;
//            }
//            LocalDateTime dateTime = LocalDateTime.parse(parts[0], form);
//            double value = Double.parseDouble(parts[1]);//המרת הערך של העמודה השניה למספר עשרוני
//            //System.out.println(value);
//            LocalDate date = dateTime.toLocalDate();//המרת תאריך למשתנה מסוג תאריך
//            //System.out.println(date);
//            int hour = dateTime.getHour();//המרת שעה למשתנה מסוג INTEGER
//            //System.out.println(hour);
//            hashMapPerDate.computeIfAbsent(date, k -> new HashMap<>())
//                    .computeIfAbsent(hour, k -> new ArrayList<>()).add(value);
//        }
//        br.close();
//        for (Map.Entry<LocalDate, Map<Integer, List<Double>>> entry : hashMapPerDate.entrySet()) {
//            LocalDate key = entry.getKey();
//            Map<Integer, List<Double>> value = entry.getValue();
//            String nameFile = "file_date_"+key+".cvs";
//            FileWriter writer = new FileWriter(nameFile);
//            writer.write("start time,value\n");
//            for (Map.Entry<Integer,List<Double>> hourEntry : value.entrySet()) {
//                int hour = hourEntry.getKey();
//                List<Double> values = hourEntry.getValue();
//                double avg=0;
//                for (double v : values) {
//                    avg+=v;
//                }
//                avg=avg/values.size();
//                writer.write(hour+","+avg+"\n");
//            }
//            writer.close();
//        }
//    }
}

