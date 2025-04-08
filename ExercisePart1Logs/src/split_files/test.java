//package split_files;
//
//import java.io.*;
//import java.util.*;
//import java.util.List;
//import java.util.Map;
//
//public class test {
//
//
//    public static List<File> splitFile(File f) throws IOException {
//        List<File> createdFiles = new ArrayList<>(); // רשימה שתשמור את כל הקבצים שנוצרו
//        int partCounter = 1; // I like to name parts from 001, 002, 003, ...
//        int sizeOfFiles = 1024 * 1024; // 1MB
//        byte[] buffer = new byte[sizeOfFiles];
//
//        String fileName = f.getName();
//
//        try (FileInputStream fis = new FileInputStream(f);
//             BufferedInputStream bis = new BufferedInputStream(fis)) {
//
//            int bytesAmount = 0;
//            while ((bytesAmount = bis.read(buffer)) > 0) {
//                // יצירת שם לחלק הקובץ
//                String filePartName = String.format("%s.%03d", fileName, partCounter++);
//                File newFile = new File(f.getParent(), filePartName);
//                try (FileOutputStream out = new FileOutputStream(newFile)) {
//                    out.write(buffer, 0, bytesAmount);
//                }
//                createdFiles.add(newFile); // הוספת הקובץ שנוצר לרשימה
//            }
//        }
//
//        return createdFiles; // מחזירים את רשימת הקבצים שנוצרו
//    }
//
//    public static Map<String, Integer> generateErrorCodeHash(File f)throws FileNotFoundException, IOException {
//    Hashtable< Integer, String > hash = new Hashtable< Integer, String >();
//        BufferedReader br = new BufferedReader(new FileReader ("students.txt"));
//        while ((thisLine = br.readLine()) != null) {
//            System.out.println(thisLine);
//        }
//    }
//
//        public static void main(String[] args) throws IOException {
//        // קריאה לפונקציה splitFile
//        List<File> files = splitFile(new File("C:\\הדסים\\תרגיל בית\\ExercisePart1Logs\\src\\logs.txt.xlsx"));
//
//        // הדפסת רשימת הקבצים שנוצרו
//        for (File file : files) {
//            System.out.println(file.getAbsolutePath());
//        }
//    }
//}
//
////        public static String extractErrorCode(String logLine) {
////        // חיפוש אחרי המילה "Error:" בשורה
////        String prefix = "Error: ";
////        int startIndex = logLine.indexOf(prefix);
////        if (startIndex != -1) {
////            // אם מצאנו "Error:", נחלץ את קוד השגיאה
////            int startCodeIndex = startIndex + prefix.length();
////            int endCodeIndex = logLine.indexOf(" ", startCodeIndex);
////            if (endCodeIndex == -1) {
////                endCodeIndex = logLine.length();  // אם אין רווח אחרי קוד השגיאה, קח את סוף השורה
////            }
////            return logLine.substring(startCodeIndex, endCodeIndex);  // מחזיר את קוד השגיאה
////        }
////        return "Unknown";  // אם לא מצאנו קוד שגיאה, מחזירים Unknown
////    }
//
//
////    public static Map<String, Integer> generateErrorCodeHash(File f) throws IOException {
////        Map<String, Integer> errorCounts = new HashMap<>(); // טבלת גיבוב לספירת קודי השגיאה
////        BufferedReader br = new BufferedReader(new FileReader(f));
////
////        String line;
////        while ((line = br.readLine()) != null) {
////            String errorCode = extractErrorCode(line); // חילוץ קוד השגיאה
////            errorCounts.put(errorCode, errorCounts.getOrDefault(errorCode, 0) + 1); // עדכון הספירה בטבלת הגיבוב
////        }
////
////        br.close(); // סגירת הקובץ לאחר השימוש
////        return errorCounts; // החזרת טבלת הגיבוב
////    }
////
////
////        public static void main(String[] args) throws IOException {
////            List<> splitFile(new File("C:\\הדסים\\תרגיל בית\\ExercisePart1Logs\\src\\logs.txt.xlsx"));
////            Map<String, Integer> errorCodeTable = generateErrorCodeHash(new File("C:\\הדסים\\תרגיל בית\\ExercisePart1Logs\\src\\logs.txt.xlsx"));
////
////            // הדפסת טבלת הגיבוב
////            for (Map.Entry<String, Integer> entry : errorCodeTable.entrySet()) {
////                System.out.println(entry.getKey() + ": " + entry.getValue());
////            }
////        }
////    }
////
