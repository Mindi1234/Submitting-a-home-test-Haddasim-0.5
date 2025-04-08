package org.example;



/*
תשובה לתרגיל 3 בחלק א' סעיף ב':
הרעיון של stream בפונקציה של חישוב ממוצע היא שבמקום לקרוא את כל השורות בקובץ
ואז להכניס את הנתונים לטבלת הגיבוב ורק אח"כ לחשב את הממוצע של כל values לפי התאריך והשעה.
בstream הוא יקבל בכל פעם שורה אחת מהקובץ ועליה יעשה כבר את הפעולה של חישוב ממוצע לפי שעות,
כלומר הוא יקבל שורה חדשה והוא יעלה את מספר הערכים ויכניס את הערך החדש לתוך משתנה שסוכם
ויעשה את החישוב הממוצע של סכום\מונה כבר בקריאה של השורה הנוכחית
בכל שורה חדשה שהstream מביא הממוצע השתנה.
 */


import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {

        System.out.println(Tests.duplicates("C:\\הדסים\\תרגיל בית\\time_series.csv"));
        System.out.println(Tests.notNumber("C:\\הדסים\\תרגיל בית\\time_series.csv"));

        Map<LocalDate, Map<Integer, Double>> averages = Tests.avgEachHour("C:\\הדסים\\תרגיל בית\\time_series.csv");
        for (LocalDate date : averages.keySet()) {
            for (int hour : averages.get(date).keySet()) {
                System.out.println("date:" + date+ " hour:"+hour+" average :"+ averages.get(date).get(hour));
            }
        }
        SplitToFiles.splitFile("C:\\הדסים\\תרגיל בית\\time_series.csv");
        List<String> fileNames = Arrays.asList(
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-01.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-02.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-03.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-04.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-05.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-06.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-07.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-08.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-09.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-10.cvs",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-11.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-12.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-13.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-14.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-15.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-16.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-17.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-18.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-19.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-20.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-21.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-22.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-23.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-24.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-25.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-26.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-27.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-28.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-29.csv",
                "C:\\הדסים\\תרגיל בית\\ExercisePart2TimeSeries\\file_date_2025-06-20.csv");

        Map<LocalDate, Map<Integer, Double>> globalAverages = MergeAll.mergeAvgAllFiles(fileNames);
        for (LocalDate date : globalAverages.keySet()) {
            for (int hour : globalAverages.get(date).keySet()) {
                System.out.println("date:" + date+ " hour:"+hour+" average :"+ globalAverages.get(date).get(hour));
            }
        }

    }
}
