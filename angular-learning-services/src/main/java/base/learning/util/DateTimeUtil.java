package base.learning.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class DateTimeUtil {

	private static SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	private static SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd-MMM-yyyy");
	private static SimpleDateFormat dateFormat3 = new SimpleDateFormat("dd-MM-yyyy");
	private static SimpleDateFormat dateFormat4 = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
	private static DateTimeFormatter dateFormatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	private static DateTimeFormatter dateFormatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	
	
	public static String getDDMMYYYYHHMMSS(String dateText) throws Exception {
		
		try {
			return dateFormat4.format(dateFormat4.parse(dateText));
		} catch (Exception ex) {
			return getDDMMYYYY(dateText);
		}
	}
	
	public static String getDDMMYYYY(String dateText) throws Exception {
		
		try {
			return dateFormat3.format(dateFormat3.parse(dateText));
		} catch (Exception ex) {
			throw new Exception("Invalid date format use [dd-MM-yyyy] OR [dd-MM-yyyy hh:mm:ss]");
		}
	}

	public static LocalDate getDateYYYMMDD(String dateText) {
		
		if(dateText!=null && !dateText.isEmpty()) {
			
			return LocalDate.parse(dateText, dateFormatter1);
		}
		return LocalDate.parse(LocalDate.now().format(dateFormatter2), dateFormatter2);
	}
	
	public static String getDateYYYYMMDDHHMMSS(String dateText) {
		
		if(dateText!=null && !dateText.isEmpty())
			return dateFormat1.format(dateText);
		
		return dateFormat1.format(new Date());
	}
	
	public static String getDateDDMMMYYYY(String dateText) {
		
		if(dateText!=null && !dateText.isEmpty()) {
			Date date = null;
			try {
				date = dateFormat1.parse(dateText);
			} catch (ParseException e) {
				System.err.println("Parse Exception");
				return null;
			}
			return dateFormat2.format(date);
		}
		
		return dateFormat2.format(new Date());
	}
	
	public static LocalDateTime getLocalDateYYYYMMDDHHMMSS(String dateText) {
		
		if(dateText!=null && !dateText.isEmpty())
			return LocalDateTime.parse(dateText, dateFormatter1);
		
		return LocalDateTime.parse(LocalDateTime.now().format(dateFormatter1), dateFormatter1);
	}
	
	public static Date getDateWithoutTimeUsingCalendar(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);

		return calendar.getTime();
	}

	public static Timestamp convertToTimestamp(LocalDateTime localDateTime) {

		return Timestamp.valueOf(localDateTime);
	}

	public static LocalDate convertToLocalDateViaSqlDate(Date dateToConvert) {

		return new java.sql.Date(dateToConvert.getTime()).toLocalDate();
	}

	public static Timestamp toDate(Timestamp timestamp) {

		LocalDateTime localDateTime = timestamp.toLocalDateTime();
		String dateStr = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		return Timestamp.valueOf(dateStr + " 00:00:00");
	}

	public static Timestamp toDate1(Timestamp timestamp) {

		LocalDateTime localDateTime = timestamp.toLocalDateTime();
		String dateStr = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		return Timestamp.valueOf(dateStr);
	}

	public static Timestamp getCurrentUTCTimestamp() {

		return convertToTimestamp(getLocalDateTimeInGMT());

	}

	@SuppressWarnings("static-access")
	public static LocalDateTime getLocalDateTimeInGMT() {

		return LocalDateTime.now(ZoneOffset.UTC).withNano(0);
	}
 
	public static LocalDateTime convertStringToLocalDateTime(String date) {

		LocalDateTime startDatetime = null;
		DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("d-MMM-yyyy");

		if (date != null && !date.isEmpty() && !date.equals("")) {
			String[] arrOfStr = date.split("-");
			String dd = arrOfStr[0];
			String mm = arrOfStr[1];
			String yyyy = arrOfStr[2];
			String convertdate = dd + "-" + mm + "-" + yyyy;

			LocalDate localDate = LocalDate.parse(convertdate, formatter2);

			startDatetime = localDate.atTime(0, 0, 0);
		}
		return startDatetime;
	}

}
