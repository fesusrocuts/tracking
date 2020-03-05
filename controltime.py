import email.utils
from time import mktime, strptime
from datetime import datetime

forecast_date = "Tue, 03 Mar 2020 22:04:40 GMT"
#forecast_date = "Tue, 04 Mar 2020 22:04:40 GMT"
forecast_time = "Thu, 01 Jan 1970 14:00:00 GMT"
forecast = forecast_date[:16] + forecast_time[16:]
forecastts = mktime(email.utils.parsedate(forecast))
forecastdtiso = datetime.fromtimestamp(forecastts)

today = datetime.now()
#today = datetime.today()
#todayts = mktime(today)
todayts = int(mktime(today.timetuple()))
todaydtiso = datetime.fromtimestamp(todayts)

diff_date = today - forecastdtiso  # timedelta object
diff_date2 = todayts - forecastts  # timedelta object


# sendMail = 1 if diff_date < 0 else 0
print("forecast")
print(forecast)
print(forecastts)
print(forecastdtiso)
print("today")
print(today)
print(todayts)
print(todaydtiso)
print("diff")
print(diff_date)
print(diff_date2)
