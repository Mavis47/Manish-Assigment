# Error is a serious problem that stops the program immediately and cannot be handled.

print("Hello"   # SyntaxError

#Occurs due to wrong syntax or system issues
#Program will not run
#Cannot be fixed using try-except
#Happens before execution (mostly)

# Exception is a runtime problem that can be handled using try-except.

x = int("abc")   # ValueError

# It Occurs during program execution
# Program crashes only if not handled
# Can be handled using try-except
# Caused by logical/runtime issues