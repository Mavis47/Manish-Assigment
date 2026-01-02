# try-except is used to handle errors (exceptions) so that your program doesn’t crash when something goes wrong.

try:
    x = int("10a")
except ValueError:
    print("Value error")
except TypeError:
    print("Type error")