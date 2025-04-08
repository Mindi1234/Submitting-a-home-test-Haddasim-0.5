import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/*
סיבוכיות זמן:
     פיצול הקובץ: O(N) ( N הוא מספר השורות בקובץ המקורי=1000000)
     ספירת שגיאות במיני קובץ: O(N) ( N עובר על כל השורות שקיים בקובץ המקורי שכל השורות מחולקות לM קבצים)
     מיזוג השגיאות: O(E*M)<O(N) (הפונקציה עוברת על M טבלאות גיבוב כל מיני קובץ יש טבלת גיבוב, ובתוך הלולאה שעוברת על הטבלה עוברים על E סוגי שגיאות קיימות.(מספר השגיאות קטן מN וM קטן בהרבה מN לכן הסיבוכיות זמן של הפונקציה לא מתחשבת))
     השגיאות הנפוצות ביותר:O(E log X) ( E הוא מספר סוגי השגיאות ,X הוא מספר השגיאות שרוצים להוציא)
     O(E log X)+ O(E*M)<O(N)+ 2*O(N)-> O(N):סה"כ זמן ריצה

סיבוכיות מקום:
    פיצול קובץ:
    O(MINI_FILE_SIZE) כל MINI_FILE_SIZE הוא מכניס לתוך זיכרון של רשימה ואז יוצר מזה קובץ ומוחק את הזיכרון בשביל השורות הבאות.
    +O(N/MINI_FILE_SIZE) =מספר השורות בקובץ, שומר את כל המיני קבצים
    +O(1) משתנים ששמורים לי בזיכרון.
    ספירת שגיאות במיני קובץ:
    O(E) E סוגי שגיאות, יצירת מפה/ טבלת גיבוב בגודל של = E .
    מיזוג טבלאות הגיבוב:
    O(E*N/MINI_FILE_SIZE) יצירת טבלת גיבוב בגודל של מספר השגיאות שעובר על כל המיני קבצים ומכניס את הערכים לתוך הטבלה החדשה הממוזגת,E=סוגי השגיאות
    יצירת ערימת טופ X שגיאות נפוצות:
    O(X) יצירת ערימת מינימום בשביל להוציא את X שגיאות הנפוצות
    +O(X) רשימת איחסון השגיאות השכיחות
    O(MINI_FILE_SIZE)+O(N/MINI_FILE_SIZE)+O(E)+O(E*N/MINI_FILE_SIZE)+2*O(X) :סה"כ סיבוכיות מקום
    -> O(MINI_FILE_SIZE+E*N/MINI_FILE_SIZE)
 */
public class Main {
    public static void main(String[] args) throws IOException {
        String filename="C:\\הדסים\\תרגיל בית\\logs1.txt";
        int N=5;

        List<String> miniFiles=FileErrorManagement.splitFile(filename);
        List<Map<String, Integer>> miniFileCounts = new ArrayList<>();
        for (String miniFile : miniFiles) {
            File file = new File(miniFile);
            miniFileCounts.add(FileErrorManagement.countErrorsInFile(file));
        }
        Map<String, Integer> globalErrorsCount=FileErrorManagement.mergeCounters(miniFileCounts);
        List<Map.Entry<String, Integer>> topErrors=FileErrorManagement.TopNErrors(globalErrorsCount,N);
        System.out.println("Top "+N+" errors:");
        for (Map.Entry<String, Integer> entry : topErrors) {
            System.out.println(entry.getKey()+" : "+entry.getValue());
        }
    }
}

